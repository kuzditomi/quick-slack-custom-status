﻿using AspNet.Security.OAuth.Slack;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using QuickSlackStatusUpdate.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace QuickSlackStatusUpdate.Controllers
{
    public class WorkspaceTokenResponse
    {
        public string app_id { get; set; }
        public string team_id { get; set; }
        public string access_token { get; set; }
    }

    public class AuthController : Controller
    {
        private string clientId;
        private string clientSecret;

        private SlackDataContext _dbContext;

        public AuthController(IConfiguration configuration, SlackDataContext dbContext)
        {
            this.clientId = configuration["SlackStatusUpdate:ClientId"];
            this.clientSecret = configuration["SlackStatusUpdate:ClientSecret"];
            this._dbContext = dbContext;
        }

        [Route("/api/slack/authorize")]
        [HttpGet]
        public async Task<ActionResult> Authenticate(string code)
        {
            var redirectUri = string.Format("{0}://{1}{2}", Request.Scheme, Request.Host.Value, "/api/slack/authorize");

            var postData = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("client_id", clientId),
                new KeyValuePair<string, string>("client_secret", clientSecret),
                new KeyValuePair<string, string>("redirect_uri", redirectUri),
                new KeyValuePair<string, string>("code", code)
            };

            string resultJsonString = "";
            using (var httpClient = new HttpClient())
            {
                using (var content = new FormUrlEncodedContent(postData))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");

                    HttpResponseMessage response = await httpClient.PostAsync("https://slack.com/api/oauth.access", content);

                    resultJsonString = await response.Content.ReadAsStringAsync();
                }
            }

            var workspaceTokenResponse = JsonConvert.DeserializeObject<WorkspaceTokenResponse>(resultJsonString);

            if (
                String.IsNullOrEmpty(workspaceTokenResponse.team_id) ||
                String.IsNullOrEmpty(workspaceTokenResponse.access_token)
            )
            {
                return new StatusCodeResult(500);
            }


            var savedToken = await this._dbContext.WorkspaceTokens.SingleOrDefaultAsync(t => t.TeamId == workspaceTokenResponse.team_id);

            if (savedToken != null)
            {
                savedToken.Token = workspaceTokenResponse.access_token;
            }
            else
            {
                this._dbContext.WorkspaceTokens.Add(new WorkspaceToken
                {
                    Id = new Guid(),
                    AppId = workspaceTokenResponse.app_id,
                    TeamId = workspaceTokenResponse.team_id,
                    Token = workspaceTokenResponse.access_token
                });
            }

            await this._dbContext.SaveChangesAsync();

            return Redirect("/");
        }


        [Route("~/signin")]
        [HttpPost]
        public ActionResult Authenticate()
        {
            return Challenge(new AuthenticationProperties { RedirectUri = "/" }, SlackAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("~/signout")]
        [HttpPost("~/signout")]
        public IActionResult SignOut()
        {
            // Instruct the cookies middleware to delete the local cookie created
            // when the user agent is redirected from the external identity provider
            // after a successful authentication flow (e.g Google or Facebook).
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
