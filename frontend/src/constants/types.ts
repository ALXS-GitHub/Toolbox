interface TypeProps {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export const TypesMap: Record<string, TypeProps> = {
    default: {
        color: '#ffffff',
        backgroundColor: '#333333',
        borderColor: '#1a1a1a',
    },
    dev: {
        color: '#ffffff',
        backgroundColor: '#007acc',
        borderColor: '#005a9e',
    },
    desktop: {
        color: '#ffffff',
        backgroundColor: '#e5c10aff',
        borderColor: '#b58f00',
    },
    design: {
        color: '#ffffff',
        backgroundColor: '#07df4fff',
        borderColor: '#05b84c',
    },
}