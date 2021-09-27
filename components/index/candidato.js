import Image from 'next/image'

export const Candidato = ({ num, name, index, addVote, removeVote, votes }) => {

  return (
    <div className='flex justify-between items-center mt-8'>

			<div className='items-center flex'>
				<span className='font-black text-2xl'>{num}</span>
				<span className='ml-12 text-2xl'>{name}</span>
			</div>

			<div className='items-center flex'>
				<div className='bg-gray-200 rounded-md cursor-pointer' onClick={() => removeVote(index)}><div className='relative w-8 h-8 m-2'><Image alt='minus' layout='fill' src='/minus.svg' /></div></div>
				<span className='text-3xl font-bold mx-8 w-8 text-center'>{votes}</span>
				<div className='bg-gray-200 rounded-md cursor-pointer' onClick={() => addVote(index)}><div className='relative w-8 h-8 m-2'><Image alt='plus' layout='fill' src='/plus.svg' /></div></div>
			</div>

    </div>
  )

}