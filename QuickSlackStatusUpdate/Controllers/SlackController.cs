using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuickSlackStatusUpdate.Data;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace QuickSlackStatusUpdate.Controllers
{
    public class SlackController : Controller
    {
        [Route("/api/slack/status")]
        [HttpPost]
        public async Task<ActionResult> UpdateStatus()
        {
            return Redirect("/");
        }
    }
}
