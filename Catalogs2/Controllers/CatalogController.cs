using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Catalogs2.Models;
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
        public IActionResult Create([FromBody] CatalogInput input)
        {
            if (!ModelState.IsValid)
                return new JsonResult(new { errMsg = "Catalog input is invalid" });
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    db.Query("[dbo].[Create_Catalog]", new { catalog_name = input.Name },
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

        // DELETE: api/Catalog/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (id <= 0)
                return new JsonResult(new {errMsg = "Invalid catalog id"});

            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    db.Query($"DELETE FROM catalogs WHERE ID = {id}");
                }
                catch (Exception ex)
                {
                    return new JsonResult(new { errMsg = ex.Message });
                }

            }
            return new JsonResult(null);
        }
    }
}
