import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';

// importaciones de componentes utilizados para hacer esta pantalla de editar usuario en administrador :>

import Input from '../components/Inputs/Input';
import InputEmail from '../components/Inputs/InputEmail';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskerInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDUI';
import Buttons from '../components/Buttons/Button';

export default function SignUp({ navigator }) {
    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [alias, setAlias] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')



    const handleLogout = async () => {
        /*
                try {
                    const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
                        method: 'GET'
                    });
        
                    const data = await response.json();
        
                    if (data.status) {
                        navigation.navigate('Sesion');
                    } else {
                        console.log(data);
                        // Alert the user about the error
                        Alert.alert('Error', data.error);
                    }
                } catch (error) {
                    console.error(error, "Error desde Catch");
                    Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
                } */
        navigation.navigate('Sesion');
    };



    const handleCreate = async () => {
        try {


            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !email.trim() || !alias.trim() ||
                !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            }

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreAdministrador', nombre);
            formData.append('apellidoAdministrador', apellido);
            formData.append('correoAdministrador', email);
            formData.append('aliasAdministrador', alias);
            formData.append('claveAdministrador', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('si ves esto es que confirma el guardado ;)');
        }
         // Limpia los campos después de agregar un administrador
    setNombre('');
    setApellido('');
    setEmail('');
    setAlias('');
    setClave('');
    setConfirmarClave('');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Registrar administrador</Text>
                <Input
                    placeHolder='Nombre administrador'
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Apellido administrador'
                    setValor={apellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Email administrador'
                    setValor={email}
                    setTextChange={setEmail} />

                <Input
                    placeHolder='Alias administrador'
                    setValor={alias}
                    setTextChange={setAlias}
                />
                <Input
                    placeHolder='Clave'
                    contra={true}
                    setValor={clave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Confirmar Clave'
                    contra={true}
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave} />

                <Buttons
                    textoBoton='Registrar administrador'
                    accionBoton={handleCreate}
                />


            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight + 5, // el 5 es para darle un pequeño margen cuando hay una camara en el centro de la pantalla
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B', fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: {
        color: '#322C2B', fontWeight: '700',
        fontSize: 18
    },

    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff", fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
});