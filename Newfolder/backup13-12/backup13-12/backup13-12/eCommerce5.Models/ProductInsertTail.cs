using System;

namespace eCommerce5.DataAccess
{
    public class ProductInsertTailInput
    {
        public Int32 serial { set; get; }
        public Int32 Id { set; get; }
        public string ProdName { set; get; }
        public string Price { set; get; }
      
    }
    public class ProductInsertTailOutput
    {
        public String ErrorNumber { set; get; }
        public Int32 Id { set; get; }

    }


}
