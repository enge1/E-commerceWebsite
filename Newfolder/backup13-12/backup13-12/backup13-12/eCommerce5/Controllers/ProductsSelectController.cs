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
    public class ProductsSelectController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductsSelectController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpGet]
        public IEnumerable<ProductsSelectOutput> post()
        {
            var param = new DynamicParameters();
           //param.Add("@Email", dbType: DbType.Int32, value: logg.Email, direction: ParameterDirection.Input);
            //param.Add("@Password", dbType: DbType.String, value: logg.Password, direction: ParameterDirection.Input);
            //param.Add("@nname", dbType: DbType.String, value: logg.nname, direction: ParameterDirection.Input);
            //param.Add("@EngNname", dbType: DbType.String, value: logg.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<ProductsSelectOutput>(ProductsSelectSD.sp_ProductsSelect, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
