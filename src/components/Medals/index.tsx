import { ReactComponent as AwardsOther } from '@assets/img/medals/awards_other.svg'
import { ReactComponent as AwardsZnachokGold } from '@assets/img/medals/awards_znachok_gold.svg'
import { ReactComponent as AwardsZnachokSilver } from '@assets/img/medals/awards_znachok_silver.svg'
import { ReactComponent as Lager } from '@assets/img/medals/lager.svg'
import { ReactComponent as Mirea } from '@assets/img/medals/mirea.svg'
import { ReactComponent as Other } from '@assets/img/medals/other.svg'
import { ReactComponent as OtradCreator } from '@assets/img/medals/otrad_creator.svg'
import { ReactComponent as ProjectsAprioriCreator } from '@assets/img/medals/projects_apriori_creator.svg'
import { ReactComponent as ProjectsKartotekaCreator } from '@assets/img/medals/projects_kartoteka_creator.svg'
import { ReactComponent as ProjectsOther } from '@assets/img/medals/projects_other.svg'
import { ReactComponent as ProjectsShva } from '@assets/img/medals/projects_shva.svg'
import { ReactComponent as SletsOther } from '@assets/img/medals/slets_other.svg'
import { ReactComponent as SletsPolar } from '@assets/img/medals/slets_polar.svg'
import { ReactComponent as Struct } from '@assets/img/medals/struct.svg'
import { ReactComponent as StructAtmotodes } from '@assets/img/medals/struct_atmotodes.svg'
import { ReactComponent as StructInfocenter } from '@assets/img/medals/struct_infocenter.svg'
import { ReactComponent as StructItotdel } from '@assets/img/medals/struct_itotdel.svg'
import { ReactComponent as StructKomissia } from '@assets/img/medals/struct_komissia.svg'
import { ReactComponent as Studunion } from '@assets/img/medals/studunion.svg'
import './index.css'

export const getMedals = (size = 16, padding = '3'): Record<string, React.SVGProps<SVGSVGElement>> => {
  const style = { width: size, height: size, padding: padding }

  return {
    'awards_znachok_gold': <AwardsZnachokGold className="medals__medal" style={style} />,
    'awards_znachok_silver': <AwardsZnachokSilver className="medals__medal" style={style} />,
    'awards_other': <AwardsOther className="medals__medal_colored-bronze" style={style} />,
    'otrad_creator': <OtradCreator className="medals__medal_colored-red" style={style} />,
    'struct_comadir': <Struct className="medals__medal_colored-gold" style={style} />,
    'struct_comissar': <Struct className="medals__medal_colored-silver" style={style} />,
    'struct_team': <Struct className="medals__medal_colored-bronze" style={style} />,
    'struct_infocenter_creator': <StructInfocenter className="medals__medal_colored-gold" style={style} />,
    'struct_infocenter_boss': <StructInfocenter className="medals__medal_colored-silver" style={style} />,
    'struct_infocenter_team': <StructInfocenter className="medals__medal_colored-bronze" style={style} />,
    'struct_atmotodes_creator': <StructAtmotodes className="medals__medal_colored-gold" style={style} />,
    'struct_atmotodes_boss': <StructAtmotodes className="medals__medal_colored-silver" style={style} />,
    'struct_atmotodes_team': <StructAtmotodes className="medals__medal_colored-bronze" style={style} />,
    'struct_itotdel_creator': <StructItotdel className="medals__medal_colored-gold" style={style} />,
    'struct_itotdel_boss': <StructItotdel className="medals__medal_colored-silver" style={style} />,
    'struct_itotdel_team': <StructItotdel className="medals__medal_colored-bronze" style={style} />,
    'struct_komissia_creator': <StructKomissia className="medals__medal_colored-gold" style={style} />,
    'struct_komissia_boss': <StructKomissia className="medals__medal_colored-silver" style={style} />,
    'struct_komissia_team': <StructKomissia className="medals__medal_colored-bronze" style={style} />,
    'projects_kartoteka_creator': <ProjectsKartotekaCreator className="medals__medal_colored-gold" style={style} />,
    'projects_apriori_creator': <ProjectsAprioriCreator className="medals__medal" style={style} />,
    'projects_shva_creator': <ProjectsShva className="medals__medal_colored-gold" style={style} />,
    'projects_shva_boss': <ProjectsShva className="medals__medal_colored-silver" style={style} />,
    'projects_shva_team': <ProjectsShva className="medals__medal_colored-bronze" style={style} />,
    'slets_polar_boss': <SletsPolar className="medals__medal" style={style} />,
    'slets_polar_team': <SletsPolar className="medals__medal" style={style} />,
    'slets_other_boss': <SletsOther className="medals__medal_colored-gold" style={style} />,
    'slets_other_team': <SletsOther className="medals__medal_colored-silver" style={style} />,
    'lager_boss': <Lager className="medals__medal_colored-gold" style={style} />,
    'lager_starvoj': <Lager className="medals__medal_colored-silver" style={style} />,
    'lager_kultorg': <Lager className="medals__medal_colored-bronze" style={style} />,
    'projects_other_creator': <ProjectsOther className="medals__medal_colored-gold" style={style} />,
    'projects_other_boss': <ProjectsOther className="medals__medal_colored-silver" style={style} />,
    'projects_other_team': <ProjectsOther className="medals__medal_colored-bronze" style={style} />,
    'studunion': <Studunion className="medals__medal" style={style} />,
    'mirea': <Mirea className="medals__medal" style={style} />,
    'other': <Other className="medals__medal_colored-bronze" style={style} />,
  }
}
