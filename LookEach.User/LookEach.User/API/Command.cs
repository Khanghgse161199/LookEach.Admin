using DevExpress.ClipboardSource.SpreadsheetML;
using LookEach.User.Data;
using LookEach.User.DTO;
using LookEach.User.Model;
using LookEach.User.ViewModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;

namespace LookEach.User.API
{
    public class Command
    {
        private HttpClient HttpClientApiAsync()
        {
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:5188");
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            return httpClient;
        }

        private async Task<JObject> ResponeJsonObject(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrEmpty(content))
                {
                    JObject job = JObject.Parse(content);
                    if (!string.IsNullOrEmpty((job["value"] + "").Trim()))
                    {
                        return job;
                    }
                    else return null;
                }
                else return null;
            }
            else
            {
                return null;
            }
        }

        public async Task<UserViewModel> RegisterCustomerAsync(UserCreateModel user)
        {
            if (user == null) return null;
            HttpClient client = HttpClientApiAsync();
            var data = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/api/Auth/register-customer", data);

            var job = await ResponeJsonObject(response);
            if (job != null)
            {
                UserViewModel newUser = JsonConvert.DeserializeObject<UserViewModel>(job["value"] + "");
                return newUser;
            }
            else return null;
        }

        public async Task<ResponseViewModel> LoginAsync(LoginDTO loginDTO)
        {
            if (loginDTO == null) return null;
            HttpClient client = HttpClientApiAsync();
            var data = new StringContent(JsonConvert.SerializeObject(loginDTO), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/api/Auth/login", data);
            if (response.IsSuccessStatusCode)
            {
                var converted = await response.Content.ReadAsStringAsync();
                ResponseViewModel login = JsonConvert.DeserializeObject<ResponseViewModel>(converted);
                return login;
            }
            else return null;
           
        }

        public async Task<ClaimDTO> CheckTokenAsync(string token)
        {
            if (string.IsNullOrEmpty(token)) return null;
            HttpClient client = HttpClientApiAsync();
            client.DefaultRequestHeaders.Add("Authorization", token);
            var response = await client.PostAsync("/api/Auth/check-token",null);

            if (response.IsSuccessStatusCode)
            {
                var converted = await response.Content.ReadAsStringAsync();
                ResponseBase<ClaimDTO> claim = JsonConvert.DeserializeObject<ResponseBase<ClaimDTO>>(converted);
                return claim.Value;
            }
            else return null;
        }
    }
}
