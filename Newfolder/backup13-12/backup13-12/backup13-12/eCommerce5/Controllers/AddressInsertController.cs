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
    public class AddressInsertController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public AddressInsertController(IUnitOfWork U)
        {
            this._unitOfWork = U;
        }

        [HttpPost]
        public IEnumerable<AddressInsertOutput> post([FromBody] AddressInsertInput logg)
        {
            var param = new DynamicParameters();
           param.Add("@Region", dbType: DbType.String, value: logg.Region, direction: ParameterDirection.Input);
           param.Add("@City", dbType: DbType.String, value: logg.City, direction: ParameterDirection.Input);
           param.Add("@StreetName", dbType: DbType.String, value: logg.StreetName, direction: ParameterDirection.Input);
            param.Add("@BuildingNumber", dbType: DbType.Int32, value: logg.BuildingNumber, direction: ParameterDirection.Input);
            param.Add("@Floor", dbType: DbType.Int32, value: logg.Floor, direction: ParameterDirection.Input);
            param.Add("@Landmark", dbType: DbType.String, value: logg.Landmark, direction: ParameterDirection.Input);
            param.Add("@ZipCode", dbType: DbType.Int32, value: logg.ZipCode, direction: ParameterDirection.Input);

            var user = _unitOfWork.SP_Call.ExecuteReturnList<AddressInsertOutput>(AddressInsertSD.sp_AddressInsert, param);

            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
