using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce5.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ISP_Call SP_Call { get; }

        void Save();
    }
}
