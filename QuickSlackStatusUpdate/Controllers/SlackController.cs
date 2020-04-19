using AspNet.Security.OAuth.Slack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuickSlackStatusUpdate.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace QuickSlackStatusUpdate.Controllers
{
    public class SlackController : Controller
    {
        private SlackDataContext _dbContext;
        public SlackController(SlackDataContext dbContext)
        {
            this._dbContext = dbContext;
        }

        private async Task<string> GetToken()
        {
            if (User.Identity.IsAuthenticated)
            {
                var teamidClaim = User.Claims.SingleOrDefault(c => c.Type == SlackAuthenticationConstants.Claims.TeamId);

                if (teamidClaim != null && !String.IsNullOrEmpty(teamidClaim.Value))
                {
                    var savedToken = await this._dbContext.WorkspaceTokens.SingleOrDefaultAsync(t => t.TeamId == teamidClaim.Value);
                    if (savedToken != null && !String.IsNullOrEmpty(savedToken.Token))
                    {
                        return savedToken.Token;
                    }
                }
            }

            return null;
        }
        
        [Route("/api/slack/status")]
        [HttpPost]
        public async Task<ActionResult> UpdateStatus(string statustext, string statusemoji)
        {
            var token = await this.GetToken();

            if (token == null)
            {
                return Unauthorized();
            }

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(new
            {
                profile = new
                {
                    status_text = statustext,
                    status_emoji = statusemoji,
                    status_expiration = 0
                }
            });

            var data = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");

            var url = "https://slack.com/api/users.profile.set";

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = await client.PostAsync(url, data);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Redirect("/");
            }

            return new StatusCodeResult(500);
        }
    }
}
