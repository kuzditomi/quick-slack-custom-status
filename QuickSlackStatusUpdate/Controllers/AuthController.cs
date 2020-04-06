﻿using AspNet.Security.OAuth.Slack;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuickSlackStatusUpdate.Data;
using System;
using System.Collections.Generic;
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
        string clientId = "";
        string clientSecret = "";

        [Route("/api/slack/authorize")]
        [HttpGet]
        public async Task<ActionResult> Authenticate(string code)
        {
            var @params = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("client_id", clientId),
                new KeyValuePair<string, string>("client_secret", clientSecret),
                new KeyValuePair<string, string>("code", code),
                new KeyValuePair<string, string>("redirect_uri", "https://<your_base_url>/api/slack/authorize")
            };

            var httpClient = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://slack.com/api/oauth.token")
            {
                Content = new FormUrlEncodedContent(@params)
            };
            var result = await httpClient.SendAsync(request);
            var resultJsonString = await result.Content.ReadAsStringAsync();
            var workspaceTokenResponse = JsonConvert.DeserializeObject<WorkspaceTokenResponse>(resultJsonString);

            using (var db = new SlackDataContext())
            {
                db.WorkspaceTokens.Add(new WorkspaceToken
                {
                    Id = new Guid(),
                    AppId = workspaceTokenResponse.app_id,
                    TeamId = workspaceTokenResponse.team_id,
                    Token = workspaceTokenResponse.access_token
                });
                db.SaveChanges();
            }

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
