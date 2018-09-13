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
            ViewBag.Title = "Add catalog";
            return View();
        }

        public ViewResult Catalog()
        {
            ViewBag.Title = "Catalog";
            return View();
        }
    }
}
