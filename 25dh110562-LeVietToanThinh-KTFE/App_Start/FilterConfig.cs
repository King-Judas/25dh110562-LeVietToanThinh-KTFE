using System.Web;
using System.Web.Mvc;

namespace _25dh110562_LeVietToanThinh_KTFE
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
