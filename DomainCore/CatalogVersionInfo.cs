using System;
using System.Collections.Generic;
using System.Text;

namespace DomainCore
{
    public class CatalogVersionInfo
    {
        public int CatalogId { get; set; }
        public int VersionId { get; set; }
        public string CatalogName { get; set; }
        public string VersionName { get; set; }
    }
}
