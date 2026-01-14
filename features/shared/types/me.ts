import type {
  AdminProfile,
  AuthorProfile,
  InstitutionProfile,
} from "@/features/panel/types";

export type UserProfile = AdminProfile | AuthorProfile | InstitutionProfile;

export interface MeResponse {
  user_type: "admin" | "author" | "institution";
  profile: UserProfile;
}
