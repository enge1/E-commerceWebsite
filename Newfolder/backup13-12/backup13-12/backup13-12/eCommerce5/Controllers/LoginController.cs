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
    public class LoginController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public LoginController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<LoginOutput> post([FromBody] LoginInput logg)
        {
            var param = new DynamicParameters();
           param.Add("@Email", dbType: DbType.String, value: logg.Email, direction: ParameterDirection.Input);
            param.Add("@Password", dbType: DbType.String, value: logg.Password, direction: ParameterDirection.Input);
            //param.Add("@nname", dbType: DbType.String, value: logg.nname, direction: ParameterDirection.Input);
            //param.Add("@EngNname", dbType: DbType.String, value: logg.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<LoginOutput>(LoginSD.sp_Login, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
