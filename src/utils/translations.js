export const translations = {
  grades: {
    'Special Grade': 'Grado Especial',
    'Grade 1': 'Primer Grado',
    'Semi-Grade 1': 'Grado Semi-1',
    'Grade 2': 'Segundo Grado',
    'Grade 3': 'Tercer Grado',
    'Grade 4': 'Cuarto Grado',
    'Unranked': 'Sin Rango'
  },
  status: {
    'Alive': 'Vivo',
    'Deceased': 'Fallecido',
    'Cursed': 'Maldito',
    'Unknown': 'Desconocido'
  },
  techniqueTypes: {
    'Innate': 'Innata',
    'Extension': 'Extensión',
    'Barrier': 'Barrera',
    'Binding Vow': 'Voto Vinculante',
    'Cursed Tool': 'Herramienta Maldita',
    'Domain Expansion': 'Expansión de Dominio',
    'Other': 'Otro'
  },
  relations: {
    'ally': 'Aliado',
    'enemy': 'Enemigo',
    'teacher': 'Maestro',
    'student': 'Alumno',
    'clan_member': 'Miembro del Clan',
    'affiliated_with': 'Afiliado'
  }
}

export const t = (category, key) => {
  return translations[category]?.[key] || key
}
