import ApiDriver from "./driver.js";

const API_HOST = "api.sova.nigrivhub.com.local";

module.exports = class API {
    
    constructor() {
        this._driver = new ApiDriver({ host: API_HOST });
    }
    
    AadLogin() {
        let url = this._driver.opaqueURL("/auth/aad/callback");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    AadParams() {
        let url = this._driver.opaqueURL("/auth/aad/params");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ChangeKeywordActivityInput = ["keyword_name", "is_active"];
    ChangeKeywordActivity({ keyword_name, is_active }) {
        let url = this._driver.opaqueURL("/keywords/active");
        return this._driver.sendPut({
            data: { keyword_name, is_active },
            endpoint: url.toString(),
        });
    }

    CloseTicketInput = ["id_ticket"];
    CloseTicket({ id_ticket }) {
        let url = this._driver.opaqueURL("/ticket/close");
        return this._driver.sendPut({
            data: { id_ticket },
            endpoint: url.toString(),
        });
    }

    CompletePhoneChallengeInput = ["challenge", "phone_number"];
    CompletePhoneChallenge({ challenge, phone_number }) {
        let url = this._driver.opaqueURL("/me/complete-phone-number");
        return this._driver.sendPut({
            data: { challenge, phone_number },
            endpoint: url.toString(),
        });
    }

    ConnectKeywordInput = ["keyword_name", "identity_name"];
    ConnectKeyword({ keyword_name, identity_name }) {
        let url = this._driver.opaqueURL("/keywords/connect");
        return this._driver.sendPost({
            data: { keyword_name, identity_name },
            endpoint: url.toString(),
        });
    }

    CreateKeywordInput = ["name"];
    CreateKeyword({ name }) {
        let url = this._driver.opaqueURL("/keywords");
        return this._driver.sendPost({
            data: { name },
            endpoint: url.toString(),
        });
    }

    CreateMyTicketInput = ["id_leak"];
    CreateMyTicket({ id_leak }) {
        let url = this._driver.opaqueURL("/my/ticket");
        return this._driver.sendPost({
            data: { id_leak },
            endpoint: url.toString(),
        });
    }

    CreateMyVipInput = ["email"];
    CreateMyVip({ email }) {
        let url = this._driver.opaqueURL("/my/vips");
        return this._driver.sendPost({
            data: { email },
            endpoint: url.toString(),
        });
    }

    CreateScanInput = ["type", "keyword_name"];
    CreateScan({ type, keyword_name }) {
        let url = this._driver.opaqueURL("/scans");
        return this._driver.sendPost({
            data: { type, keyword_name },
            endpoint: url.toString(),
        });
    }

    CreateUserInput = ["email", "password", "source"];
    CreateUser({ email, password, source }) {
        let url = this._driver.opaqueURL("/user");
        return this._driver.sendPost({
            data: { email, password, source },
            endpoint: url.toString(),
        });
    }

    CreateVipWatchInput = ["identity_name", "email"];
    CreateVipWatch({ identity_name, email }) {
        let url = this._driver.opaqueURL("/vip/watch");
        return this._driver.sendPost({
            data: { identity_name, email },
            endpoint: url.toString(),
        });
    }

    DeleteMyPhone(input) {
        let url = this._driver.opaqueURL("/me/phone-number");
        return this._driver.sendDelete({
            data: input,
            endpoint: url.toString(),
        });
    }

    DeleteVipInput = ["email"];
    DeleteVip({ email }) {
        let url = this._driver.opaqueURL("/my/vips");
        return this._driver.sendDelete({
            data: { email },
            endpoint: url.toString(),
        });
    }

    DirectQueryKeywordInput = ["keyword", "page", "from", "to"];
    DirectQueryKeyword({ keyword, page, from, to }) {
        let url = this._driver.opaqueURL("/keywords/directquery");
        return this._driver.sendPost({
            data: { keyword, page, from, to },
            endpoint: url.toString(),
        });
    }

    DisconnectKeywordInput = ["keyword_name", "identity_name"];
    DisconnectKeyword({ keyword_name, identity_name }) {
        let url = this._driver.opaqueURL("/keywords/connect");
        return this._driver.sendDelete({
            data: { keyword_name, identity_name },
            endpoint: url.toString(),
        });
    }

    FinalizeMFAInput = ["email", "password"];
    FinalizeMFA({ email, password }) {
        let url = this._driver.opaqueURL("/login/mfa/ack");
        return this._driver.sendPost({
            data: { email, password },
            endpoint: url.toString(),
        });
    }

    GetIdentityQuotaInput = ["id_identity"];
    GetIdentityQuota({ id_identity }) {
        let url = this._driver.opaqueURL("/quota/identity");
        return this._driver.sendPost({
            data: { id_identity },
            endpoint: url.toString(),
        });
    }

    GetMyLeakInput = ["id_leak"];
    GetMyLeak({ id_leak }) {
        let url = this._driver.opaqueURL("/my/leak");
        return this._driver.sendPost({
            data: { id_leak },
            endpoint: url.toString(),
        });
    }

    GetUserQuotaInput = ["id_user"];
    GetUserQuota({ id_user }) {
        let url = this._driver.opaqueURL("/quota/user");
        return this._driver.sendPost({
            data: { id_user },
            endpoint: url.toString(),
        });
    }

    GrantAccessInput = ["email", "identity_name", "role"];
    GrantAccess({ email, identity_name, role }) {
        let url = this._driver.opaqueURL("/access");
        return this._driver.sendPost({
            data: { email, identity_name, role },
            endpoint: url.toString(),
        });
    }

    CreateIdentityDatastore(input) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendPost({
            data: input,
            endpoint: url.toString(),
        });
    }

    DeleteIdentityDatastoreInput = ["name", "created_at", "quota"];
    DeleteIdentityDatastore({ name, created_at, quota }) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendDelete({
            data: { name, created_at, quota },
            endpoint: url.toString(),
        });
    }

    ListIdentityDatastoreInput = ["name", "created_at", "quota"];
    ListIdentityDatastore({ name, created_at, quota }) {
        let url = this._driver.opaqueURL(["", "v1", "identities"].join("/"));
        if (name) url.searchParams.set("name", name);
        if (created_at) url.searchParams.set("created_at", created_at);
        if (quota) url.searchParams.set("quota", quota);

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    UpdateIdentityDatastoreInput = ["where", "to"];
    UpdateIdentityDatastore({ where, to }) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendPut({
            data: { where, to },
            endpoint: url.toString(),
        });
    }

    IdentityExchangeInput = ["id_identity"];
    IdentityExchange({ id_identity }) {
        let url = this._driver.opaqueURL("/me/identity-exchange");
        return this._driver.sendPost({
            data: { id_identity },
            endpoint: url.toString(),
        });
    }

    IntegrationTest(input) {
        let url = this._driver.opaqueURL("/integration-test");
        return this._driver.sendPost({
            data: input,
            endpoint: url.toString(),
        });
    }

    ListAccessForInput = ["identity_name"];
    ListAccessFor({ identity_name }) {
        let url = this._driver.opaqueURL("/identity/access");
        return this._driver.sendPost({
            data: { identity_name },
            endpoint: url.toString(),
        });
    }

    ListKeywords() {
        let url = this._driver.opaqueURL("/keywords");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListKeywordsByIdentityInput = ["identity_name"];
    ListKeywordsByIdentity({ identity_name }) {
        let url = this._driver.opaqueURL("/identity/keywords");
        return this._driver.sendPost({
            data: { identity_name },
            endpoint: url.toString(),
        });
    }

    ListLeaksByIdentityInput = ["identity_name"];
    ListLeaksByIdentity({ identity_name }) {
        let url = this._driver.opaqueURL("/identity/leaks");
        return this._driver.sendPost({
            data: { identity_name },
            endpoint: url.toString(),
        });
    }

    ListMyIdentities() {
        let url = this._driver.opaqueURL("/my/identities");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListMyKeywords() {
        let url = this._driver.opaqueURL("/my/keywords");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListMyLeaks() {
        let url = this._driver.opaqueURL("/my/leaks");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListMyTickets() {
        let url = this._driver.opaqueURL("/my/tickets");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListMyTicketsByLeakInput = ["id_leak"];
    ListMyTicketsByLeak({ id_leak }) {
        let url = this._driver.opaqueURL("/my/tickets-by-leak");
        return this._driver.sendPost({
            data: { id_leak },
            endpoint: url.toString(),
        });
    }

    ListScans() {
        let url = this._driver.opaqueURL("/scans");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListSeriesInput = ["id_identity"];
    ListSeries({ id_identity }) {
        let url = this._driver.opaqueURL(["", "identity", encodeURIComponent(id_identity), "series"].join("/"));
        if (id_identity) url.searchParams.set("id_identity", id_identity);

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListUsers() {
        let url = this._driver.opaqueURL("/users");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListVipInput = ["identity_name", "email"];
    ListVip({ identity_name, email }) {
        let url = this._driver.opaqueURL("/identity/vip");
        return this._driver.sendPost({
            data: { identity_name, email },
            endpoint: url.toString(),
        });
    }

    MyPhoneNumber() {
        let url = this._driver.opaqueURL("/me/phone-number");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    MyVIPs() {
        let url = this._driver.opaqueURL("/me/vips");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    PasswordLoginInput = ["email", "password"];
    PasswordLogin({ email, password }) {
        let url = this._driver.opaqueURL("/auth/password");
        return this._driver.sendPost({
            data: { email, password },
            endpoint: url.toString(),
        });
    }

    PasswordResetInput = ["email", "reset_token", "password"];
    PasswordReset({ email, reset_token, password }) {
        let url = this._driver.opaqueURL("/users/password-reset");
        return this._driver.sendPost({
            data: { email, reset_token, password },
            endpoint: url.toString(),
        });
    }

    ReopenTicketInput = ["id_ticket"];
    ReopenTicket({ id_ticket }) {
        let url = this._driver.opaqueURL("/ticket/reopen");
        return this._driver.sendPut({
            data: { id_ticket },
            endpoint: url.toString(),
        });
    }

    RequestResetPasswordInput = ["email"];
    RequestResetPassword({ email }) {
        let url = this._driver.opaqueURL("/users/password-reset/request");
        return this._driver.sendPost({
            data: { email },
            endpoint: url.toString(),
        });
    }

    RevokeAccessInput = ["email", "identity_name", "role"];
    RevokeAccess({ email, identity_name, role }) {
        let url = this._driver.opaqueURL("/access");
        return this._driver.sendDelete({
            data: { email, identity_name, role },
            endpoint: url.toString(),
        });
    }

    RunSeries(input) {
        let url = this._driver.opaqueURL("/series/run");
        return this._driver.sendPost({
            data: input,
            endpoint: url.toString(),
        });
    }

    ScheduleKeywordInput = ["name"];
    ScheduleKeyword({ name }) {
        let url = this._driver.opaqueURL("/keyword-management/schedule");
        return this._driver.sendPost({
            data: { name },
            endpoint: url.toString(),
        });
    }

    SendNotifications(input) {
        let url = this._driver.opaqueURL("/send-notifications");
        return this._driver.sendPost({
            data: input,
            endpoint: url.toString(),
        });
    }

    ServiceLoginInput = ["key"];
    ServiceLogin({ key }) {
        let url = this._driver.opaqueURL("/auth/service");
        return this._driver.sendPost({
            data: { key },
            endpoint: url.toString(),
        });
    }

    SetPhoneInput = ["email", "phone"];
    SetPhone({ email, phone }) {
        let url = this._driver.opaqueURL("/user/phone");
        return this._driver.sendPut({
            data: { email, phone },
            endpoint: url.toString(),
        });
    }

    SetQuotaInput = ["value"];
    SetQuota({ value }) {
        let url = this._driver.opaqueURL("/quota/set");
        return this._driver.sendPost({
            data: { value },
            endpoint: url.toString(),
        });
    }

    StartPhoneChallengeInput = ["phone"];
    StartPhoneChallenge({ phone }) {
        let url = this._driver.opaqueURL("/me/start-phone-challenge");
        return this._driver.sendPut({
            data: { phone },
            endpoint: url.toString(),
        });
    }

    SystemTime() {
        let url = this._driver.opaqueURL("/system-time");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    TEST() {
        let url = this._driver.opaqueURL("/test");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    CreateTicketDatastore(input) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendPost({
            data: input,
            endpoint: url.toString(),
        });
    }

    DeleteTicketDatastoreInput = ["id_leak", "id_identity", "description", "state", "created_at", "closed_at"];
    DeleteTicketDatastore({ id_leak, id_identity, description, state, created_at, closed_at }) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendDelete({
            data: { id_leak, id_identity, description, state, created_at, closed_at },
            endpoint: url.toString(),
        });
    }

    ListTicketDatastoreInput = ["id_leak", "id_identity", "description", "state", "created_at", "closed_at"];
    ListTicketDatastore({ id_leak, id_identity, description, state, created_at, closed_at }) {
        let url = this._driver.opaqueURL(["", "v1", "tickets"].join("/"));
        if (id_leak) url.searchParams.set("id_leak", id_leak);
        if (id_identity) url.searchParams.set("id_identity", id_identity);
        if (description) url.searchParams.set("description", description);
        if (state) url.searchParams.set("state", state);
        if (created_at) url.searchParams.set("created_at", created_at);
        if (closed_at) url.searchParams.set("closed_at", closed_at);

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    UpdateTicketDatastoreInput = ["where", "to"];
    UpdateTicketDatastore({ where, to }) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendPut({
            data: { where, to },
            endpoint: url.toString(),
        });
    }

    ToggleMFAInput = ["state"];
    ToggleMFA({ state }) {
        let url = this._driver.opaqueURL("/login/mfa/toggle");
        return this._driver.sendPost({
            data: { state },
            endpoint: url.toString(),
        });
    }

    UpdateTicketDescriptionInput = ["id_ticket", "description"];
    UpdateTicketDescription({ id_ticket, description }) {
        let url = this._driver.opaqueURL("/ticket/description");
        return this._driver.sendPut({
            data: { id_ticket, description },
            endpoint: url.toString(),
        });
    }

};