using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using QuickSlackStatusUpdate.Data;

namespace QuickSlackStatusUpdate
{
    public class Startup
    {
        string clientId = "";
        string clientSecret = "";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            this.clientId = configuration["SlackStatusUpdate:ClientId"];
            this.clientSecret = configuration["SlackStatusUpdate:ClientSecret"];
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SlackDataContext>(options =>
                options.UseSqlite($"Data Source=db/slackstatus.db")
            );

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                // Only loopback proxies are allowed by default.
                // Clear that restriction because forwarders are enabled by explicit 
                // configuration.
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            services.AddControllersWithViews();
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
                    .AddCookie(options =>
                    {
                        options.LoginPath = "/signin";
                        options.LogoutPath = "/signout";
                    })
                    .AddSlack(options =>
                    {
                        options.ClientId = clientId;
                        options.ClientSecret = clientSecret;
                    });

            services.AddProgressiveWebApp();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use((context, next) =>
            {
                context.Request.Scheme = "https";
                context.Request.PathBase = new PathString("/api");

                return next();
            });

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
