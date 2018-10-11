using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainCore;

namespace Catalogs2.Models
{
    public class CatalogTable
    {
        public CatalogTable(IEnumerable<Field> cols, Dictionary<int, IEnumerable<Cell>> rows)
        {
            Cols = cols;
            Rows = rows;
        }
        public IEnumerable<Field> Cols { get; }
        public Dictionary<int, IEnumerable<Cell>> Rows { get; }
    }
}
