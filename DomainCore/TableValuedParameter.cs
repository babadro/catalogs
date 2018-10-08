using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace DomainCore
{
    public class TableValuedParameter : SqlMapper.ICustomQueryParameter
    {
        private DataTable _dataTable;
        private string _typeName;

        public TableValuedParameter(DataTable dataTable)
        {
            this._typeName = dataTable.TableName;
            _dataTable = dataTable;
        }

        public void AddParameter(IDbCommand command, string name)
        {
            var parameter = (SqlParameter) command.CreateParameter();

            parameter.ParameterName = name;
            parameter.SqlDbType = SqlDbType.Structured;
            parameter.Value = _dataTable;
            parameter.TypeName = _dataTable.TableName;

            command.Parameters.Add(parameter);
        }
    }
}
