import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from 'react';
import MaskInput from 'react-native-mask-input';


export default function ScreenEmprestimo() {
    const [valor, setValor] = React.useState<String | Number>('');
    const [parcelas, setParcelas] = React.useState<String | Number>('');
    const [juros, setJuros] = React.useState<String | Number>('');
    const [valorParcela, setValorParcela] = React.useState<String | Number>('');
    const [montante, setMontante] = React.useState<String | Number>('');

    //formula do juros composto
    //M = C * (1 + i)^t
    //M = montante
    //C = capital
    //i = taxa de juros
    //t = tempo

    const calcValorParcela = () => {
        const numberValor = Number(valor);
        const numberParcelas = Number(parcelas);
        const numberJuros = Number(juros);
        setValorParcela(
            (numberValor / numberParcelas + (numberValor * (numberJuros / 100))).toFixed(2)
        );


    }

    useEffect((() => {
        const numberValor = Number(valor);
        const numberParcelas = Number(parcelas);
        const numberJuros = Number(juros);
        const jurosConvertido = (numberJuros / 100);

        setMontante(
            (numberValor * (1 + jurosConvertido) ** numberParcelas).toFixed(2)
        );
    }
    ), [valorParcela]);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>Calculadora de Empréstimo</Text>

                    <MaskInput
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                        style={styles.textInput}
                        onChangeText={(masked, unmasked) => {
                            setValor(masked); // you can use the unmasked value as well
                        }}
                        value={String(valor)}
                        placeholder="Valor do empréstimo"
                        keyboardType="numeric"
                    />
                    <MaskInput
                        mask={[/\d/, /\d/]}
                        style={styles.textInput}
                        onChangeText={(masked, unmasked) => setParcelas(masked)}
                        value={String(parcelas)}
                        placeholder="Parcelas"
                        keyboardType="numeric"
                    />
                    <MaskInput
                        mask={[/\d/, /\d/]}
                        maxLength={2}
                        style={styles.textInput}
                        onChangeText={(value: String) => setJuros(value)}
                        value={String(juros)}
                        placeholder="Juros: 1%"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={calcValorParcela}
                    >
                        <Text>Calcular</Text>
                    </TouchableOpacity>
                    <Text>Valor da parcela: {Number(valorParcela) | 0}</Text>
                    <Text>Montante: R$ {Number(montante)}</Text>

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        gap: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        padding: 5,
        height: 40,
        width: 200,
        borderColor: '#006eff',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
});