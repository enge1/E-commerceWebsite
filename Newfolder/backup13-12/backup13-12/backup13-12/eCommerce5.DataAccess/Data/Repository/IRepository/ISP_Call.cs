using Dapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce5.DataAccess.Data.Repository.IRepository
{
   public  interface ISP_Call
    {
        IEnumerable<T> ExecuteReturnList<T>(string procedurename, DynamicParameters param=null);

        void ExecutewithoutReturn(string procedurename, DynamicParameters param = null);

        T ExecuteReturnScaler<T>(string procedurename, DynamicParameters param = null);

    }
}
