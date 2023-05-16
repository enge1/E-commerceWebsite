using eCommerce5.DataAccess.Data.Repository.IRepository;
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;

namespace eCommerce5.DataAccess.Data.Repository
{
    public class SP_Call : ISP_Call
    {
        private readonly ApplicationDbContext _db;
        private static string connectionString;

        public SP_Call(ApplicationDbContext db)
        {
            _db = db;
            connectionString = _db.Database.GetDbConnection().ConnectionString;
        }

        public IEnumerable<T> ExecuteReturnList<T>(string procedurename, DynamicParameters param = null)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                return cn.Query<T>(procedurename, param, commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        public T ExecuteReturnScaler<T>(string procedurename, DynamicParameters param = null)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                return (T)Convert.ChangeType(
                    cn.ExecuteScalar<T>(procedurename, param, commandType: System.Data.CommandType.StoredProcedure),
                    typeof(T));
            }
        }

        public void ExecutewithoutReturn(string procedurename, DynamicParameters param = null)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                cn.Execute(procedurename, param, commandType: System.Data.CommandType.StoredProcedure);
            }
        }
    }
}
