using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AspNet.Security.OAuth.Slack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using QuickSlackStatusUpdate.Data;
using QuickSlackStatusUpdate.Models;

namespace QuickSlackStatusUpdate.Controllers
{
    public class HomeController : Controller
    {
        private string clientId;
        private readonly ILogger<HomeController> _logger;
        private readonly SlackDataContext _dbContext;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration, SlackDataContext dbContext)
        {
            _logger = logger;
            this.clientId = configuration["SlackStatusUpdate:ClientId"];
            this._dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            var scope = "users.profile:write";
            var redirectUri = string.Format("{0}://{1}{2}", Request.Scheme, Request.Host.Value, "/api/slack/authorize");

            var model = new AddButtonModel
            {
                SlackUrl = $"https://slack.com/oauth/authorize?scope={scope}&client_id={clientId}&redirect_uri={redirectUri}"
            };

            if (User.Identity.IsAuthenticated)
            {
                var teamidClaim = User.Claims.SingleOrDefault(c => c.Type == SlackAuthenticationConstants.Claims.TeamId);

                if (teamidClaim != null && !String.IsNullOrEmpty(teamidClaim.Value))
                {
                    var savedToken = await this._dbContext.WorkspaceTokens.SingleOrDefaultAsync(t => t.TeamId == teamidClaim.Value);
                    if (savedToken != null && !String.IsNullOrEmpty(savedToken.Token))
                    {
                        model.IsLinked = true;
                    }
                }
            }

            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
