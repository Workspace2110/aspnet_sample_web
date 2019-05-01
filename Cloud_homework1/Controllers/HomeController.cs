using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cloud_homework1.Models;

namespace Cloud_homework1.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home/Index
        [HttpGet, ActionName("Index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, ActionName("Game")]
        public IActionResult Game()
        {
            return View();
        }

        // GET: Home/About
        [HttpGet, ActionName("About")]
        public IActionResult About()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
