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
    public class ProductInsertTailController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductInsertTailController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<ProductInsertTailOutput> post([FromBody] ProductInsertTailInput logg)
        {
            var param = new DynamicParameters();
           param.Add("@serial", dbType: DbType.Int32, value: logg.serial, direction: ParameterDirection.Input);
           param.Add("@Id", dbType: DbType.Int32, value: logg.Id, direction: ParameterDirection.Input);
           param.Add("@ProdName", dbType: DbType.String, value: logg.ProdName, direction: ParameterDirection.Input);
           param.Add("@Price", dbType: DbType.String, value: logg.Price, direction: ParameterDirection.Input);
            //param.Add("@nname", dbType: DbType.String, value: logg.nname, direction: ParameterDirection.Input);
            //param.Add("@EngNname", dbType: DbType.String, value: logg.EngNname, direction: ParameterDirection.Input);
            //param.Add("@UserLanguage", dbType: DbType.String, value: logg.UserLanguage, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<ProductInsertTailOutput>(ProductInsertTailSD.sp_ProductInsertTail, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
