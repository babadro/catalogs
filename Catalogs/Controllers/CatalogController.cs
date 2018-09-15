using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Dapper;
using Domain;

namespace Catalogs.Controllers
{
    public class CatalogController : Controller
    {
        // GET: Catalog/All
        public ActionResult All()
        {
            List<Catalog> catalogList = new List<Catalog>();
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["TestConnectionString"].ConnectionString))
            {

                catalogList = db.Query<Catalog>("Select * From catalogs").ToList();
            }
            return View();
        }

        // GET: Catalog/Single/5
        public ActionResult Single(int id)
        {
            return View();
        }

        // GET: Catalog/Add
        public ActionResult Add()
        {
            return View();
        }

        // POST: Catalog/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Catalog/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Catalog/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Catalog/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Catalog/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
