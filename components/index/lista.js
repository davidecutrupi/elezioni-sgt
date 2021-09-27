import Image from 'next/image'

export const Lista = ({ icon, index, addVote, removeVote, votes }) => {

  return (
    <div className='flex flex-col items-center'>

      <div className='flex items-center'>
        <div className='bg-gray-200 rounded-md cursor-pointer' onClick={() => removeVote(index)}><div className='relative w-8 h-8 m-2'><Image alt='minus' layout='fill' src='/minus.svg' /></div></div>
        <span className='text-3xl font-bold mx-8'>{votes}</span>
        <div className='bg-gray-200 rounded-md cursor-pointer' onClick={() => addVote(index)}><div className='relative w-8 h-8 m-2'><Image alt='plus' layout='fill' src='/plus.svg' /></div></div>
      </div>

      <div className='relative w-28 h-28 mt-4'><Image alt='icon' layout='fill' src={`/${icon}.png`} /></div>

    </div>
  )

}