using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Dapper;
using DomainCore;

namespace Catalogs2.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IDbConnection _dbConnection;

        public SampleDataController(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            IEnumerable<IGrouping<int, CatalogVersionInfo>> catalogsAndVersions;
            using (IDbConnection db = _dbConnection)
            {
                catalogsAndVersions = db.Query<CatalogVersionInfo>(
                    @"
                        SELECT cat.catalog_name, cat.ID AS catalogId, ver.version_name, ver.ID AS versionId FROM
                        (SELECT * FROM catalogs) cat
                        LEFT JOIN
                        (SELECT * FROM versions) ver
                        ON
                        cat.ID = ver.catalog_id
                    "
                ).GroupBy(info => info.CatalogId);
            }

            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            // Temp

            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<IGrouping<int, CatalogVersionInfo>> Catalogs()
        {
            IEnumerable<IGrouping<int, CatalogVersionInfo>> catalogsAndVersions;
            using (IDbConnection db = _dbConnection)
            {
                catalogsAndVersions = db.Query<CatalogVersionInfo>(
                    @"
                        SELECT cat.catalog_name, cat.ID AS catalogId, ver.version_name, ver.ID AS versionId FROM
                        (SELECT * FROM catalogs) cat
                        LEFT JOIN
                        (SELECT * FROM versions) ver
                        ON
                        cat.ID = ver.catalog_id
                    "
                ).GroupBy(info => info.CatalogId);
            }

            return catalogsAndVersions;
        }

        [HttpPost("[action]")]
        public ActionResult CreateCatalog([FromBody] Catalog catalog)
        {
            if (catalog.Name == "" || string.IsNullOrWhiteSpace(catalog.Name))
                return new BadRequestResult();
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    var res = db.Query("[dbo][Create_Catalog]", new {catalog_name = catalog.Name},
                        commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex)
                {
                    return new StatusCodeResult(2);
                }
                
            }

            return Ok();
        }
    }
}
