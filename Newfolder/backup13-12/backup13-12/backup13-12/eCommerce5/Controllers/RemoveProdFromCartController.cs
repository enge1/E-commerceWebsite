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
    public class RemoveProdFromCartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public RemoveProdFromCartController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<RemoveProdFromCartOutput> post([FromBody] RemoveProdFromCartInput logg)
        {
            var param = new DynamicParameters();
           param.Add("@Id", dbType: DbType.Int32, value: logg.Id, direction: ParameterDirection.Input);
          //  param.Add("@ProdName", dbType: DbType.String, value: logg.ProdName, direction: ParameterDirection.Input);
            

            var user = _unitOfWork.SP_Call.ExecuteReturnList<RemoveProdFromCartOutput>(RemoveProdFromCartSD.sp_RemoveProdFromCart, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
