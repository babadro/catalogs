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
            List<Version> versionList = new List<Version>();
            List<CatalogVersionInfo> catalogsAndVersions;
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["TestConnectionString"].ConnectionString))
            {

                catalogList = db.Query<Catalog>("Select * From catalogs").ToList();
                versionList = db.Query<Version>("Select * from versions").ToList();
                catalogsAndVersions = db.Query<CatalogVersionInfo>(
                    @"
                        SELECT cat.catalog_name, cat.ID AS catalogId, ver.version_name, ver.ID AS versionId FROM
                        (SELECT * FROM catalogs) cat
                        LEFT JOIN
                        (SELECT * FROM versions) ver
                        ON
                        cat.ID = ver.catalog_id
                    "
                ).ToList();
            }

            var catalogs = catalogsAndVersions.GroupBy(info => info.CatalogId);//.Select(g => g.First()).Select(cv => new Catalog(cv.CatalogId, cv.CatalogName));
            //var temp = catalogsAndVersions
            //List<Catalog> catalogs = catalogsAndVersions


            
            //List<Version> versionList = new List<Version>();

            var model = new List<(Catalog, List<CatalogVersion>)>
            {
                (new Catalog(1, "First Catalog"), new List<CatalogVersion>
                {
                    new CatalogVersion(1, "Ver 1"),
                    new CatalogVersion(2, "Ver 2"),
                    new CatalogVersion(3, "Ver 3")
                }),
                (new Catalog(2, "Second Catalog"), new List<CatalogVersion>
                {
                    new CatalogVersion(4, "Ver 1"),
                    new CatalogVersion(5, "Ver 2"),
                    new CatalogVersion(6, "Ver 3")
                }),
                (new Catalog(3, "Third Catalog"), new List<CatalogVersion>
                {
                    new CatalogVersion(7, "Ver 1"),
                    new CatalogVersion(8, "Ver 2"),
                    new CatalogVersion(9, "Ver 3")
                }),
                (new Catalog(4, "Mama mia catalog"), new List<CatalogVersion>
                {
                    new CatalogVersion(10, "Ver 1"),
                    new CatalogVersion(11, "Ver 2"),
                    new CatalogVersion(12, "Ver 3")
                })
            };

            return View(model);
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
