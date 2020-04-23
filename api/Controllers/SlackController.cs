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
    [ApiController]
    [Route("[controller]")]
    public class SlackController : ControllerBase
    {
        private SlackDataContext _dbContext;
        public SlackController(SlackDataContext dbContext)
        {
            this._dbContext = dbContext;
        }

        private async Task<string> GetToken(Guid linkId)
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.Claims.SingleOrDefault(c => c.Type == SlackAuthenticationConstants.Claims.UserId);

                if (userIdClaim != null && !String.IsNullOrEmpty(userIdClaim.Value))
                {
                    var savedToken = await this._dbContext.WorkspaceTokens.SingleOrDefaultAsync(t => t.Id == linkId);

                    if (savedToken == null || savedToken.UserId != userIdClaim.Value)
                    {
                        return null;
                    }

                    return savedToken.Token;
                }
            }

            return null;
        }

        [Route("status")]
        [HttpPost]
        public async Task<ActionResult> UpdateStatus(string linkId, string statustext, string statusemoji)
        {
            var token = await this.GetToken(Guid.Parse(linkId));

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
