using eCommerce5.DataAccess.Data.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce5.DataAccess.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            //ReasonTypes = new ReasonTypeRepository(_db);
            //Reasons = new ReasonRepository(_db);
            SP_Call = new SP_Call(_db);
        }
        //public IReasonTypesRepository ReasonTypes { get; private set; }
        //public IReasonsRepository Reasons { get; private set; }

        public ISP_Call SP_Call { get; private set; }

        public void Dispose()
        {
            _db.Dispose();
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
