using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using DomainCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Catalogs2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementController : ControllerBase
    {

        private readonly IDbConnection _dbConnection;

        public ElementController(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        // GET: api/Element
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Element/5
        [HttpGet("{id}", Name = "GetElement")]
        public string Get(int id)
        {
            return "value";
        }

        // GET: api/Element/create/5
        [HttpGet("{catalogId}", Name = "Fields")]
        [ActionName("Create")]
        public JsonResult Fields(int catalogId)
        {
            IEnumerable<Field> fields;
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    fields = db.Query<Field>($"SELECT * FROM FIELDS WHERE catalog_id = {catalogId}");
                }
                catch (Exception ex)
                {
                    return new JsonResult(new {errMsg = ex.Message});
                }
            }

            return new JsonResult(fields);
        }

        // POST: api/Element
        [HttpPost]
        public void Create([FromBody] string value)
        {
        }

        // PUT: api/Element/5
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
