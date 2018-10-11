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
using Microsoft.EntityFrameworkCore.Internal;

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
        public JsonResult Get(int id)
        {
            IEnumerable<CatalogDto> dtos;
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    dtos = db.Query<CatalogDto>($@"
                        SELECT fv.ID as val_id, string_val, bool_val, int_val, date_val, element_id, f.ID as field_id, field_name, field_type
                        FROM field_values fv
                        RIGHT JOIN fields f ON fv.field_id = f.ID
                        WHERE f.catalog_id = {id}
                    ");
                }
                catch (Exception ex)
                {
                    return new JsonResult(new { errMsg = ex.Message });
                }

            }
            var cols = dtos.GroupBy(dto => dto.FieldId).Select(g => g.First()).Select(dto => new Field(dto.FieldId, dto.FieldName, dto.FieldType));
            var rows = dtos
                .GroupBy(dto => dto.ElementId)
                .Where(g => g.First().ElementId != 0)
                .ToDictionary(g => g.Key, g => g.Select(dto => new Cell(dto.ValueId, dto.FieldId, dto.FieldType, dto.StringVal, dto.BoolVal, dto.IntVal, dto.DateVal)));

            return new JsonResult(new CatalogTable(cols, rows));
        }

        // POST: api/Catalog
        [HttpPost]
        public IActionResult Create([FromBody] CatalogInput input)
        {
            if (!ModelState.IsValid)
                return new JsonResult(new { errMsg = "Catalog input is invalid" });
            var fields = new DataTable();
            fields.Columns.Add("FieldName", typeof(string));
            fields.Columns.Add("FieldType", typeof(int));
            foreach (var field in input.Fields)
                fields.Rows.Add(field.Name, field.FieldType);
            var parameters = new DynamicParameters();
            parameters.Add("@catalog_name", input.Name);
            parameters.Add("@field_list", fields.AsTableValuedParameter());
            using (IDbConnection db = _dbConnection)
            {
                try
                {
                    db.Query("[dbo].[Create_Catalog]", parameters, commandType: CommandType.StoredProcedure);
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
