interface GreeterProps {
    id: string;
    message: string;
}


const Greeter = ({message, id}:{message: string, id: string}) => {
    return (
        <h1>こんにちは、{ message }さん。ID={id}ですね</h1>
    )
}

export default Greeter;