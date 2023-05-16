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
    public class CardCredentialInsertController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CardCredentialInsertController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<Return> post([FromBody] CardCredentialInsertInput logg)
        {
            var param = new DynamicParameters();
            param.Add("@Cardnumber", dbType: DbType.Int64, value: logg.Cardnumber, direction: ParameterDirection.Input);
            param.Add("@CardHolderName", dbType: DbType.String, value: logg.CardHolderName, direction: ParameterDirection.Input);
            param.Add("@ExpityDate", dbType: DbType.String, value: logg.ExpityDate, direction: ParameterDirection.Input);
            param.Add("@CVC", dbType: DbType.Int32, value: logg.CVC, direction: ParameterDirection.Input);
            // param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<Return>(CardCredentialInsertSD.sp_CardCredentialInsert, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}