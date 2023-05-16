
using System;

namespace eCommerce5.DataAccess
{
    public class CardCredentialInsertInput
    {
        public Int64? Cardnumber { set; get; }
        public string CardHolderName { set; get; }
        public string ExpityDate { set; get; }
        public Int32? CVC { set; get; }

    }
    //public class CardCredentialInsertOutput
    //{
    //    public String ErrorMessage { set; get; }


    //}


}