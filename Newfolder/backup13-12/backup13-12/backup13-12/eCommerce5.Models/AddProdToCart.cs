using System;

namespace eCommerce5.DataAccess
{
    public class AddProdToCartInput
    {
        public Int32? Id { set; get; }
        public String ProdName { set; get; }
      
    }
    public class AddProdToCartOutput
    {
        public String ErrorNumber { set; get; }
        public Int32 Id { set; get; }
     
    }


}
