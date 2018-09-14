using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Catalogs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ViewResult Add()
        {
            return View();
        }

        public ViewResult Catalog()
        {
            return View();
        }

        public ViewResult Catalogs()
        {
            return View();
        }
    }
}
