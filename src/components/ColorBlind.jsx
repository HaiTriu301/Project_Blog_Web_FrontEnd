import { useDispatch, useSelector } from 'react-redux';
import { setColorBlindMode } from '../redux/colorBlind/colorBlindSlice';
import {Dropdown, DropdownHeader, DropdownItem} from 'flowbite-react';
import { HiEye, HiCheck } from 'react-icons/hi';

export default function ColorBlindSettings() {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.colorBlind);


    const options = [
        { value: 'cb-none', label: 'Mắt bình thường', desc: 'Màu gốc' },
        { value: 'cb-achromatopsia', label: 'Mù màu hoàn toàn', desc: 'Trắng đen' },
        { value: 'cb-protanopia', label: 'Mù màu Đỏ', desc: 'Protanopia' },
        { value: 'cb-deuteranopia', label: 'Mù màu Xanh lá', desc: 'Deuteranopia' },
        { value: 'cb-tritanopia', label: 'Mù màu Xanh dương', desc: 'Tritanopia' },
    ];

    return (
        <div className="relative m-2">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer">
                        <HiEye className={`w-5 h-5 ${mode === 'cb-none' ? 'text-gray-500' : 'text-purple-600'}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {options.find(opt => opt.value === mode)?.label || 'Hiển thị'}
            </span>
                    </div>
                }
            >
                <DropdownHeader>
          <span className="block text-sm font-bold text-gray-900 dark:text-white">
            Chế độ hỗ trợ thị giác
          </span>
                    <span className="block truncate text-xs font-normal text-gray-500">
            Chọn bộ lọc phù hợp với mắt bạn
          </span>
                </DropdownHeader>
                {options.map((option) => (
                    <DropdownItem
                        key={option.value}
                        onClick={() => dispatch(setColorBlindMode(option.value))}
                        className={`flex justify-between items-center gap-3 px-4 py-3 ${
                            mode === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''
                        }`}
                    >
                        <div className="flex flex-col text-left">
              <span className={`text-sm ${mode === option.value ? 'font-bold text-purple-600' : 'text-gray-700 dark:text-gray-200'}`}>
                {option.label}
              </span>
                            <span className="text-xs text-gray-400">
                {option.desc}
              </span>
                        </div>
                        {mode === option.value && <HiCheck className="text-purple-600 w-5 h-5" />}
                    </DropdownItem>
                ))}
            </Dropdown>
        </div>
    );
}