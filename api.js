const ApiDriver = require("./driver.js");

const API_HOST = "api.sova.nigrivhub.com";

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

    ChangeDomainActivityInput = ["domain_name", "is_active"];
    ChangeDomainActivity({ domain_name, is_active }) {
        let url = this._driver.opaqueURL("/domains/active");
        return this._driver.sendPut({
            data: { domain_name, is_active },
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

    ConnectDomainInput = ["domain_name", "identity_name"];
    ConnectDomain({ domain_name, identity_name }) {
        let url = this._driver.opaqueURL("/domains/connect");
        return this._driver.sendPost({
            data: { domain_name, identity_name },
            endpoint: url.toString(),
        });
    }

    CreateDomainInput = ["name"];
    CreateDomain({ name }) {
        let url = this._driver.opaqueURL("/domains");
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

    CreateScanInput = ["type", "domain_name"];
    CreateScan({ type, domain_name }) {
        let url = this._driver.opaqueURL("/scans");
        return this._driver.sendPost({
            data: { type, domain_name },
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

    DigDomainInput = ["domain"];
    DigDomain({ domain }) {
        let url = this._driver.opaqueURL("/domains/dig");
        return this._driver.sendPost({
            data: { domain },
            endpoint: url.toString(),
        });
    }

    DisconnectDomainInput = ["domain_name", "identity_name"];
    DisconnectDomain({ domain_name, identity_name }) {
        let url = this._driver.opaqueURL("/domains/connect");
        return this._driver.sendDelete({
            data: { domain_name, identity_name },
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

    GrantAccessInput = ["email", "identity_name", "role"];
    GrantAccess({ email, identity_name, role }) {
        let url = this._driver.opaqueURL("/access");
        return this._driver.sendPost({
            data: { email, identity_name, role },
            endpoint: url.toString(),
        });
    }

    CreateIdentityInput = ["id_identity", "name"];
    CreateIdentity({ id_identity, name }) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendPost({
            data: { id_identity, name },
            endpoint: url.toString(),
        });
    }

    DeleteIdentityInput = ["id_identity", "name"];
    DeleteIdentity({ id_identity, name }) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendDelete({
            data: { id_identity, name },
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

    ListIdentityInput = ["id_identity", "name"];
    ListIdentity({ id_identity, name }) {
        let url = this._driver.opaqueURL(["", "v1", "identities"].join("/"));
        if (id_identity) url.searchParams.set("id_identity", id_identity);
        if (name) url.searchParams.set("name", name);

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    UpdateIdentityInput = ["id_identity", "name"];
    UpdateIdentity({ id_identity, name }) {
        let url = this._driver.opaqueURL("/v1/identities");
        return this._driver.sendPut({
            data: { id_identity, name },
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

    ListDomains() {
        let url = this._driver.opaqueURL("/domains");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListDomainsByIdentityInput = ["identity_name"];
    ListDomainsByIdentity({ identity_name }) {
        let url = this._driver.opaqueURL("/identity/domains");
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

    ListMyDomains() {
        let url = this._driver.opaqueURL("/my/domains");

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    ListMyIdentities() {
        let url = this._driver.opaqueURL("/my/identities");

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
        let url = this._driver.opaqueURL("/user");

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

    RunScanDTInput = ["domain_name"];
    RunScanDT({ domain_name }) {
        let url = this._driver.opaqueURL("/scans/run-dt");
        return this._driver.sendPost({
            data: { domain_name },
            endpoint: url.toString(),
        });
    }

    RunScanFullInput = ["domain_name"];
    RunScanFull({ domain_name }) {
        let url = this._driver.opaqueURL("/scans/run-full");
        return this._driver.sendPost({
            data: { domain_name },
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

    ScanDomainInput = ["domain"];
    ScanDomain({ domain }) {
        let url = this._driver.opaqueURL("/domains/scan");
        return this._driver.sendPost({
            data: { domain },
            endpoint: url.toString(),
        });
    }

    ScheduleDomainInput = ["name"];
    ScheduleDomain({ name }) {
        let url = this._driver.opaqueURL("/domains-management/schedule");
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

    CreateTicketInput = ["id_ticket", "id_leak", "id_identity", "description", "state"];
    CreateTicket({ id_ticket, id_leak, id_identity, description, state }) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendPost({
            data: { id_ticket, id_leak, id_identity, description, state },
            endpoint: url.toString(),
        });
    }

    DeleteTicketInput = ["id_ticket", "id_leak", "id_identity", "description", "state"];
    DeleteTicket({ id_ticket, id_leak, id_identity, description, state }) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendDelete({
            data: { id_ticket, id_leak, id_identity, description, state },
            endpoint: url.toString(),
        });
    }

    ListTicketInput = ["id_ticket", "id_leak", "id_identity", "description", "state"];
    ListTicket({ id_ticket, id_leak, id_identity, description, state }) {
        let url = this._driver.opaqueURL(["", "v1", "tickets"].join("/"));
        if (id_ticket) url.searchParams.set("id_ticket", id_ticket);
        if (id_leak) url.searchParams.set("id_leak", id_leak);
        if (id_identity) url.searchParams.set("id_identity", id_identity);
        if (description) url.searchParams.set("description", description);
        if (state) url.searchParams.set("state", state);

        return this._driver.sendGet({
            endpoint: url.toString(),
        });
    }

    UpdateTicketInput = ["id_ticket", "id_leak", "id_identity", "description", "state"];
    UpdateTicket({ id_ticket, id_leak, id_identity, description, state }) {
        let url = this._driver.opaqueURL("/v1/tickets");
        return this._driver.sendPut({
            data: { id_ticket, id_leak, id_identity, description, state },
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