using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using DomainCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Catalogs2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly IDbConnection _dbConnection;

        public CatalogController(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        // GET: api/Catalog
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Catalog/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Catalog
        [HttpPost]
        public IActionResult Create(Catalog catalog)
        {
            if (catalog.Name == "" || string.IsNullOrWhiteSpace(catalog.Name))
                return new JsonResult(new { errMsg = "Invalid catalog name" });
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    var res = db.Query("[dbo].[Create_Catalog]", new { catalog_name = catalog.Name },
                        commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex)
                {
                    return new JsonResult(new { errMsg = ex.Message });
                }

            }

            return new JsonResult(null);
        }

        // PUT: api/Catalog/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
