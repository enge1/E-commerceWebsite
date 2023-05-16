using Dapper;
using eCommerce5.DataAccess;
using eCommerce5.DataAccess.Data.Repository.IRepository;
using eCommerce5.Models;
using eCommerce5.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;

namespace eCommerce5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class insertProcudreController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public insertProcudreController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<insertProcedureOutput> post([FromBody] insertProcedureInput logg)
        {
            var param = new DynamicParameters();
           param.Add("@no", dbType: DbType.Int32, value: logg.no, direction: ParameterDirection.Input);
            param.Add("@name", dbType: DbType.String, value: logg.name, direction: ParameterDirection.Input);
            //param.Add("@nname", dbType: DbType.String, value: logg.nname, direction: ParameterDirection.Input);
            //param.Add("@EngNname", dbType: DbType.String, value: logg.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<insertProcedureOutput>(insertProcedureSD.sp_InsertProcedure, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
