export * from './auth.service';
import { AuthService } from './auth.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './lobbies.service';
import { LobbiesService } from './lobbies.service';
export * from './members.service';
import { MembersService } from './members.service';
export const APIS = [AuthService, DefaultService, LobbiesService, MembersService];
