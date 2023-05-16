using Dapper;
using eCommerce5.DataAccess.Data.Repository.IRepository;
using eCommerce5.Models;
using eCommerce5.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace eCommerce5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestApiController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public TestApiController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpGet]
        public IEnumerable<test> Get(/*[FromBody] test logg*/)
        {
            var param = new DynamicParameters();
            //param.Add("@Ncode", dbType: DbType.Int32, value: logg.Ncode, direction: ParameterDirection.Input);
            //param.Add("@RoleID", dbType: DbType.Int32, value: logg.RoleID, direction: ParameterDirection.Input);
            //param.Add("@nname", dbType: DbType.String, value: logg.nname, direction: ParameterDirection.Input);
            //param.Add("@EngNname", dbType: DbType.String, value: logg.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<test>(UtilitySD.TestProcedure, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
