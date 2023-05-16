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
    public class RegisterController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public RegisterController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<Return> post([FromBody] RegisterInput test)
        {
            var param = new DynamicParameters();
           param.Add("@Email", dbType: DbType.String, value: test.Email, direction: ParameterDirection.Input);
           param.Add("@Password", dbType: DbType.String, value: test.Password, direction: ParameterDirection.Input);
           param.Add("@ConfirmPass", dbType: DbType.String, value: test.ConfirmPass, direction: ParameterDirection.Input);
         //  param.Add("@EngNname", dbType: DbType.String, value: test.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<Return>(RegisterSD.sp_Register, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
