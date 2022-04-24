export default function FormValidate({children, rules}) {
    return (
        <div className="custom-form-validate">
            <div
                className="border border-red-500 text-left object-fit"
            >
                {children}
            </div>
            {rules?.required &&(
                <p
                    className="text-red text-left mt-1"
                    style={{
                        color:"red"
                    }}
                >
                    {rules?.message||"Please fill in this field!"}
                </p>
            )}
        </div>
    )
}