import type { SvgIconComponent } from '@mui/icons-material';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import LaptopMacRoundedIcon from '@mui/icons-material/LaptopMacRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

export const fallbackCategoryIcon = Inventory2RoundedIcon;

export const categoryIcons: Record<string, SvgIconComponent> = {
  Salary: WorkRoundedIcon,
  Rent: HomeRoundedIcon,
  Food: RestaurantRoundedIcon,
  Transport: DirectionsCarRoundedIcon,
  Entertainment: MovieRoundedIcon,
  Healthcare: LocalHospitalRoundedIcon,
  Utilities: BoltRoundedIcon,
  Shopping: ShoppingBagRoundedIcon,
  Freelance: LaptopMacRoundedIcon,
  Investment: QueryStatsRoundedIcon,
  Other: Inventory2RoundedIcon,
};
