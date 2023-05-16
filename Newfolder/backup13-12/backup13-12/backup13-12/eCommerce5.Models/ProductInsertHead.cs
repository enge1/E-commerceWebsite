using System;

namespace eCommerce5.DataAccess
{
    public class ProductInsertHeadInput
    {
        public String ProdName { set; get; }
        public String Price { set; get; }

    }
    public class ProductInsertHeadOutput
    {
        public String ErrorNumber { set; get; }
        public Int32 ProductID { set; get; }
        public Int32 SerialNumber { set; get; }

    }


}
