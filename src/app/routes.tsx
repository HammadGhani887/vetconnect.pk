import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { VetConnectLayout } from "./components/vetconnect/VetConnectLayout";
import { HomePage } from "./pages/vetconnect/HomePage";
import { ServicesPage } from "./pages/vetconnect/ServicesPage";
import { FindVetPage } from "./pages/vetconnect/FindVetPage";
import { ForClinicsPage } from "./pages/vetconnect/ForClinicsPage";
import { AboutPage } from "./pages/vetconnect/AboutPage";
import { BlogPage } from "./pages/vetconnect/BlogPage";
import { BlogArticlePage } from "./pages/vetconnect/BlogArticlePage";
import { ContactPage } from "./pages/vetconnect/ContactPage";
import { SignUpPage } from "./pages/vetconnect/SignUpPage";
import { VetConnectLoginPage } from "./pages/vetconnect/VetConnectLoginPage";
import { DesignSystemPage } from "./pages/vetconnect-lite/DesignSystemPage";
import { VetConnectLiteLoginPage } from "./pages/vetconnect-lite/LoginPage";
import { DesignSystemV2Page } from "./pages/vetconnect-lite/DesignSystemV2Page";
import { LoginResponsivePage } from "./pages/vetconnect-lite/LoginResponsivePage";
import { ClinicSetupPage } from "./pages/vetconnect-lite/ClinicSetupPage";
import { DashboardPage } from "./pages/vetconnect-lite/DashboardPage";
import { VetProfilePage } from "./pages/vetconnect/VetProfilePage";
import { BookingPage } from "./pages/vetconnect/BookingPage";
import { PortalPage } from "./pages/vetconnect/PortalPage";
import { PetHealthRecord } from "./pages/vetconnect/PetHealthRecord";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { OwnersList } from "./pages/OwnersList";
import { AddEditOwner } from "./pages/AddEditOwner";
import { OwnerDetail } from "./pages/OwnerDetail";
import { PetsList } from "./pages/PetsList";
import { AddEditPet } from "./pages/AddEditPet";
import { PetDetail } from "./pages/PetDetail";
import { NewVisit } from "./pages/NewVisit";
import { VisitDetail } from "./pages/VisitDetail";
import { AddTreatment } from "./pages/AddTreatment";
import { TreatmentHistory } from "./pages/TreatmentHistory";
import { VaccinationRecord } from "./pages/VaccinationRecord";
import { AddVaccination } from "./pages/AddVaccination";
import { FollowUpSchedule } from "./pages/FollowUpSchedule";
import { InvoicePage } from "./pages/Invoice";
import { InvoiceList } from "./pages/InvoiceList";
import { GenerateInvoice } from "./pages/GenerateInvoice";
import { Reports } from "./pages/Reports";
import { SyncScreen } from "./pages/SyncScreen";
import { ClinicProfile } from "./pages/ClinicProfile";
import { Settings } from "./pages/Settings";
import { MoreMenu } from "./pages/MoreMenu";

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const router = createBrowserRouter([
  // ─── VetConnect Marketing Website ───────────────────────────
  {
    path: "/vetconnect",
    Component: VetConnectLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "find-vet", Component: FindVetPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/article", Component: BlogArticlePage },
      { path: "contact", Component: ContactPage },
      { path: "vet/:id", Component: VetProfilePage },
      { path: "book/:vetId", Component: BookingPage },
      { path: "for-clinics", Component: ForClinicsPage },
      { path: "about", Component: AboutPage },
    ],
  },

  // ─── VetConnect Pet Owner Portal (standalone layout) ─────────
  { path: "/vetconnect/portal", Component: PortalPage },
  { path: "/vetconnect/portal/pets/:petId", Component: PetHealthRecord },
  { path: "/vetconnect/signup", Component: SignUpPage },
  { path: "/vetconnect/login", Component: VetConnectLoginPage },
  { path: "/vetconnect-lite/design-system", Component: DesignSystemPage },
  { path: "/vetconnect-lite/design-system-v2", Component: DesignSystemV2Page },
  { path: "/vetconnect-lite/login-v2", Component: LoginResponsivePage },
  { path: "/vetconnect-lite/login", Component: VetConnectLiteLoginPage },
  { path: "/vetconnect-lite/setup", Component: ClinicSetupPage },
  { path: "/vetconnect-lite/dashboard", Component: DashboardPage },

  // ─── PawCare Clinic App ──────────────────────────────────────
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, element: <Navigate to="/vetconnect" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "owners", Component: OwnersList },
      { path: "owners/add", Component: AddEditOwner },
      { path: "owners/:id", Component: OwnerDetail },
      { path: "owners/:id/edit", Component: AddEditOwner },
      { path: "pets", Component: PetsList },
      { path: "pets/add", Component: AddEditPet },
      { path: "pets/:id", Component: PetDetail },
      { path: "pets/:id/edit", Component: AddEditPet },
      { path: "pets/:id/visit/new", Component: NewVisit },
      { path: "pets/:id/visit/:visitId", Component: VisitDetail },
      { path: "pets/:id/visit/:visitId/treatment/add", Component: AddTreatment },
      { path: "pets/:id/treatments", Component: TreatmentHistory },
      { path: "pets/:id/vaccinations/add", Component: AddVaccination },
      { path: "follow-ups", Component: FollowUpSchedule },
      { path: "vaccinations-list", Component: VaccinationRecord },
      { path: "invoices", Component: InvoiceList },
      { path: "invoices/generate/:visitId", Component: GenerateInvoice },
      { path: "invoices/:id", Component: InvoicePage },
      { path: "reports", Component: Reports },
      { path: "sync", Component: SyncScreen },
      { path: "clinic-profile", Component: ClinicProfile },
      { path: "settings", Component: Settings },
      { path: "more", Component: MoreMenu },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/vetconnect" replace />,
  },
]);